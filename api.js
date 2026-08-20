/*
 * ============================================================
 * LESDESK - FRONTEND API GATEWAY
 * ------------------------------------------------------------
 * Sprint : 10
 * Status : READ + SETTINGS INTEGRATION
 *
 * RULES
 * 1. This is the single frontend -> backend gateway.
 * 2. No UI/rendering logic belongs here.
 * 3. No Spreadsheet business logic belongs here.
 * 4. Do not create another fetch wrapper elsewhere.
 * 5. Write requests use the same gateway; no second fetch wrapper.
 * ============================================================
 */
(function (global) {
  'use strict';

  const CONFIG = Object.freeze({
    baseUrl: 'https://script.google.com/macros/s/AKfycbytJ3SFYntE8kvmd0woTkucYtTxAUvoC131ob799xCV_SmpGvoJ2Gch8n26_EvezOZ_YA/exec',
    timeoutMs: 15000
  });

  function buildUrl(action, params) {
    const url = new URL(CONFIG.baseUrl);

    if (action) {
      url.searchParams.set('action', action);
    }

    if (params && typeof params === 'object') {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  async function request(action, params) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.timeoutMs);
    const options = params && params.__requestOptions ? params.__requestOptions : {};
    const query = params && params.__requestOptions ? { ...params } : params;
    if (query && query.__requestOptions) delete query.__requestOptions;

    try {
      const method = String(options.method || 'GET').toUpperCase();
      const requestInit = {
        method,
        headers: {
          Accept: 'application/json'
        },
        signal: controller.signal
      };

      if (method === 'POST') {
        requestInit.headers['Content-Type'] = 'text/plain;charset=utf-8';
        requestInit.body = JSON.stringify({
          action,
          data: options.data || {}
        });
      }

      const response = await fetch(
        method === 'POST' ? CONFIG.baseUrl : buildUrl(action, query),
        requestInit
      );

      const raw = await response.text();
      let payload;

      try {
        payload = JSON.parse(raw);
      } catch (parseError) {
        throw new Error(
          `Backend tidak mengembalikan JSON. HTTP ${response.status}.`
        );
      }

      if (!response.ok) {
        throw new Error(
          payload && payload.message
            ? payload.message
            : `HTTP ${response.status}.`
        );
      }

      return payload;
    } finally {
      clearTimeout(timer);
    }
  }

  function post(action, data) {
    return request(action, { __requestOptions: { method: 'POST', data } });
  }

  async function health() {
    return request(null);
  }

  function normalizeStudent(raw, index) {
    return {
      // UI key only. The real backend identifier remains student_id.
      id: index + 1,
      student_id: raw && raw.student_id != null ? raw.student_id : '',
      nis: raw && raw.nis != null ? raw.nis : '',
      name: raw && raw.full_name != null ? raw.full_name : '',
      class: raw && raw.class_name != null ? raw.class_name : '',
      phone: '',
      status: raw && String(raw.status || '').toUpperCase() === 'ACTIVE' ? 'Active' :
        raw && String(raw.status || '').toUpperCase() === 'INACTIVE' ? 'Inactive' :
        raw && raw.status ? String(raw.status) : '',
      created_at: raw && raw.created_at != null ? raw.created_at : '',
      updated_at: raw && raw.updated_at != null ? raw.updated_at : '',
      notes: raw && raw.notes != null ? raw.notes : ''
    };
  }

  function toBackendStudent(data) {
    data = data || {};
    return {
      student_id: data.student_id || data.id || '',
      nis: data.nis != null ? String(data.nis).trim() : '',
      full_name: data.full_name != null ? String(data.full_name).trim() : (data.name != null ? String(data.name).trim() : ''),
      class_name: data.class_name != null ? String(data.class_name).trim() : (data.class != null ? String(data.class).trim() : ''),
      status: String(data.status || 'ACTIVE').toUpperCase(),
      notes: data.notes != null ? String(data.notes).trim() : ''
    };
  }

  const students = Object.freeze({
    list: async function (params) {
      const response = await request('student.list', params);

      if (Array.isArray(response.data)) {
        return {
          ...response,
          data: response.data.map(normalizeStudent)
        };
      }

      return response;
    },
    get: async function (params) {
      const response = await request('student.get', params);
      if (response && response.data) {
        return { ...response, data: normalizeStudent(response.data, 0) };
      }
      return response;
    },
    create: async function (data) {
      const response = await post('student.create', toBackendStudent(data));
      if (response && response.data) {
        return { ...response, data: normalizeStudent(response.data, 0) };
      }
      return response;
    },
    update: async function (data) {
      const response = await post('student.update', toBackendStudent(data));
      if (response && response.data) {
        return { ...response, data: normalizeStudent(response.data, 0) };
      }
      return response;
    },
    delete: function (data) {
      return post('student.delete', {
        student_id: data && (data.student_id || data.id) ? (data.student_id || data.id) : ''
      });
    }
  });


  function normalizeInvoice(raw, index, students) {
    const paid = Number(raw && (raw.paid_amount != null ? raw.paid_amount : raw.paid) || 0);
    const amount = Number(raw && raw.amount || 0);
    const rawStatus = String(raw && raw.status || '').toUpperCase();
    const status = rawStatus === 'PAID' ? 'Paid' :
      rawStatus === 'PARTIAL' || rawStatus === 'PARTIALLY PAID' ? 'Partially Paid' :
      rawStatus === 'OVERDUE' ? 'Overdue' :
      rawStatus === 'UNPAID' ? 'Unpaid' :
      paid >= amount ? 'Paid' :
      paid > 0 ? 'Partially Paid' : 'Unpaid';

    const student = Array.isArray(students)
      ? students.find(item => String(item.student_id || '') === String(raw && raw.student_id || ''))
      : null;

    let period = '';
    if (raw && raw.invoice_date) {
      const date = new Date(raw.invoice_date);
      if (!Number.isNaN(date.getTime())) {
        period = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
    }

    return {
      id: index + 1,
      invoice_id: raw && raw.invoice_id != null ? raw.invoice_id : '',
      no: raw && raw.invoice_number != null ? raw.invoice_number : '',
      student_id: raw && raw.student_id != null ? raw.student_id : '',
      student: raw && raw.student_name != null ? raw.student_name : (student ? student.name : ''),
      class: student ? student.class : '',
      academic_year_id: raw && raw.academic_year_id != null ? raw.academic_year_id : '',
      invoice_date: raw && raw.invoice_date != null ? raw.invoice_date : '',
      due_date: raw && raw.due_date != null ? raw.due_date : '',
      period,
      category: raw && raw.category != null ? raw.category : '',
      description: raw && raw.description != null ? raw.description : '',
      amount,
      paid,
      status,
      notes: raw && raw.notes != null ? raw.notes : '',
      created_at: raw && raw.created_at != null ? raw.created_at : '',
      updated_at: raw && raw.updated_at != null ? raw.updated_at : ''
    };
  }

  function toBackendInvoice(data) {
    data = data || {};
    return {
      invoice_id: data.invoice_id || data.id || '',
      student_id: data.student_id || '',
      academic_year_id: data.academic_year_id || '',
      invoice_date: data.invoice_date || '',
      due_date: data.due_date || '',
      category: data.category != null ? String(data.category).trim() : '',
      description: data.description != null ? String(data.description).trim() : '',
      amount: data.amount != null ? Number(data.amount) : 0,
      notes: data.notes != null ? String(data.notes).trim() : ''
    };
  }

  const invoices = Object.freeze({
    list: async function (params, students) {
      const response = await request('invoice.list', params);

      if (Array.isArray(response.data)) {
        return {
          ...response,
          data: response.data.map((item, index) => normalizeInvoice(item, index, students))
        };
      }

      return response;
    },
    get: async function (params, students) {
      const response = await request('invoice.get', params);
      if (response && response.data) {
        return { ...response, data: normalizeInvoice(response.data, 0, students) };
      }
      return response;
    },
    create: async function (data, students) {
      const response = await post('invoice.create', toBackendInvoice(data));
      if (response && response.data) {
        return { ...response, data: normalizeInvoice(response.data, 0, students) };
      }
      return response;
    },
    update: async function (data, students) {
      const response = await post('invoice.update', toBackendInvoice(data));
      if (response && response.data) {
        return { ...response, data: normalizeInvoice(response.data, 0, students) };
      }
      return response;
    },
    delete: function (data) {
      return post('invoice.delete', {
        invoice_id: data && (data.invoice_id || data.id) ? (data.invoice_id || data.id) : ''
      });
    }
  });


  function normalizePayment(raw, index, invoices) {
    const invoice = Array.isArray(invoices)
      ? invoices.find(item => String(item.invoice_id || '') === String(raw && raw.invoice_id || ''))
      : null;

    const methodRaw = String(raw && raw.payment_method || '').toUpperCase();
    const method = methodRaw === 'CASH' ? 'Cash' :
      methodRaw === 'TRANSFER' ? 'Transfer' :
      methodRaw === 'QRIS' ? 'QRIS' :
      methodRaw === 'E-WALLET' ? 'E-Wallet' :
      raw && raw.payment_method ? String(raw.payment_method) : '';

    return {
      id: index + 1,
      payment_id: raw && raw.payment_id != null ? raw.payment_id : '',
      no: raw && raw.receipt_number != null ? raw.receipt_number : '',
      invoice_id: raw && raw.invoice_id != null ? raw.invoice_id : '',
      invoice: invoice ? invoice.no : '',
      student: invoice ? invoice.student : '',
      date: raw && raw.payment_date != null ? raw.payment_date : '',
      amount: Number(raw && raw.amount || 0),
      method,
      notes: raw && raw.notes != null ? raw.notes : '',
      created_at: raw && raw.created_at != null ? raw.created_at : '',
      updated_at: raw && raw.updated_at != null ? raw.updated_at : '',
      // UI-only derived state retained for the existing dashboard table.
      status: 'Completed'
    };
  }

  function toBackendPayment(data) {
    data = data || {};
    return {
      payment_id: data.payment_id || data.id || '',
      invoice_id: data.invoice_id || '',
      payment_date: data.payment_date || data.date || '',
      amount: data.amount != null ? Number(data.amount) : 0,
      payment_method: data.payment_method || data.method || 'CASH',
      notes: data.notes != null ? String(data.notes).trim() : ''
    };
  }

  const payments = Object.freeze({
    list: async function (params, invoices) {
      const response = await request('payment.list', params);

      if (Array.isArray(response.data)) {
        return {
          ...response,
          data: response.data.map((item, index) => normalizePayment(item, index, invoices))
        };
      }

      return response;
    },
    get: async function (params, invoices) {
      const response = await request('payment.get', params);
      if (response && response.data) {
        return { ...response, data: normalizePayment(response.data, 0, invoices) };
      }
      return response;
    },
    create: async function (data, invoices) {
      const response = await post('payment.create', toBackendPayment(data));
      if (response && response.data) {
        return { ...response, data: normalizePayment(response.data, 0, invoices) };
      }
      return response;
    },
    update: async function (data, invoices) {
      const response = await post('payment.update', toBackendPayment(data));
      if (response && response.data) {
        return { ...response, data: normalizePayment(response.data, 0, invoices) };
      }
      return response;
    },
    delete: function (data) {
      return post('payment.delete', {
        payment_id: data && (data.payment_id || data.id) ? (data.payment_id || data.id) : ''
      });
    }
  });



  function normalizeAcademicYear(raw, index) {
    raw = raw || {};
    const semesterRaw = String(raw.semester || '').toUpperCase();
    const statusRaw = String(raw.status || '').toUpperCase();
    return {
      id: raw.academic_year_id != null ? raw.academic_year_id : `LOCAL-${index + 1}`,
      academic_year_id: raw.academic_year_id != null ? raw.academic_year_id : '',
      year: raw.academic_year != null ? raw.academic_year : '',
      semester: semesterRaw === 'GANJIL' || semesterRaw === 'ODD' || semesterRaw === '1' ? 'odd' :
        semesterRaw === 'GENAP' || semesterRaw === 'EVEN' || semesterRaw === '2' ? 'even' :
        raw.semester ? String(raw.semester).toLowerCase() : '',
      startDate: raw.start_date || '',
      endDate: raw.end_date || '',
      status: statusRaw === 'ACTIVE' ? 'active' : 'inactive',
      notes: raw.notes || '',
      created_at: raw.created_at || '',
      updated_at: raw.updated_at || ''
    };
  }

  function toBackendAcademicYear(data) {
    return {
      academic_year_id: data.academic_year_id || data.id || '',
      academic_year: data.academic_year || data.year || '',
      semester: data.semester === 'odd' ? 'GANJIL' : data.semester === 'even' ? 'GENAP' : String(data.semester || '').toUpperCase(),
      start_date: data.start_date || data.startDate || '',
      end_date: data.end_date || data.endDate || '',
      status: data.status === 'active' ? 'ACTIVE' : String(data.status || '').toUpperCase() || 'INACTIVE',
      notes: data.notes || ''
    };
  }

  const academic = Object.freeze({
    list: async function () {
      const response = await request('academic.list');
      if (Array.isArray(response.data)) {
        return { ...response, data: response.data.map(normalizeAcademicYear) };
      }
      return response;
    },
    create: async function (data) {
      const response = await post('academic.create', toBackendAcademicYear(data));
      if (response && response.data) {
        return { ...response, data: normalizeAcademicYear(response.data, 0) };
      }
      return response;
    },
    update: async function (data) {
      const response = await post('academic.update', toBackendAcademicYear(data));
      if (response && response.data) {
        return { ...response, data: normalizeAcademicYear(response.data, 0) };
      }
      return response;
    },
    delete: function (data) {
      return post('academic.delete', toBackendAcademicYear(data));
    }
  });

  function normalizeSettings(raw) {
    raw = raw || {};
    return {
      school_name: raw.school_name != null ? raw.school_name : '',
      school_address: raw.school_address != null ? raw.school_address : '',
      school_phone: raw.school_phone != null ? raw.school_phone : '',
      school_email: raw.school_email != null ? raw.school_email : '',
      principal_name: raw.principal_name != null ? raw.principal_name : '',
      current_academic_year: raw.current_academic_year != null ? raw.current_academic_year : '',
      currency: raw.currency != null ? raw.currency : 'IDR',
      timezone: raw.timezone != null ? raw.timezone : 'Asia/Jakarta'
    };
  }

  const settings = Object.freeze({
    get: async function () {
      const response = await request('setting.get');
      if (response && response.data && !Array.isArray(response.data)) {
        return { ...response, data: normalizeSettings(response.data) };
      }
      return response;
    },
    save: async function (data) {
      const response = await post('setting.save', normalizeSettings(data));
      if (response && response.data && !Array.isArray(response.data)) {
        return { ...response, data: normalizeSettings(response.data) };
      }
      return response;
    }
  });

  const API = Object.freeze({
    version: '0.6.0-sprint10',
    config: Object.freeze({
      baseUrl: CONFIG.baseUrl
    }),
    request,
    post,
    health,
    students,
    invoices,
    payments,
    academic,
    settings
  });

  global.LESDESK_API = API;
})(window);
