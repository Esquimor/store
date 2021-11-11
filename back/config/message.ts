/**
 * Messages type: Informational
 */
export const INFORMATIONAL = {
  HTTP_CONTINUE: {
    code: 100,
    label: "100 Continue"
  },
  HTTP_SWITCHING_PROTOCOLS: {
    code: 101,
    label: "101 Switching Protocols"
  },
  HTTP_PROCESSING: {
    code: 102,
    label: "102 Processing"
  }
};

/**
 * Messages type: Success
 */
export const SUCCESS = {
  HTTP_OK: {
    code: 200,
    label: "200 OK"
  },
  HTTP_CREATED: {
    code: 201,
    label: "201 Created"
  },
  HTTP_ACCEPTED: {
    code: 202,
    label: "202 Accepted"
  },
  HTTP_NON_AUTHORITATIVE_INFORMATION: {
    code: 203,
    label: "203 Non-Authoritative Information"
  },
  HTTP_NO_CONTENT: {
    code: 204,
    label: "204 No Content"
  },
  HTTP_RESET_CONTENT: {
    code: 205,
    label: "205 Reset Content"
  },
  HTTP_PARTIAL_CONTENT: {
    code: 206,
    label: "206 Partial Content"
  },
  HTTP_MULTI_STATUS: {
    code: 207,
    label: "207 Multi-Status"
  },
  HTTP_ALREADY_REPORTED: {
    code: 208,
    label: "208 Already Reported"
  },
  HTTP_IM_USED: {
    code: 226,
    label: "226 IM Used"
  }
};

/**
 * Message type: Redirection
 */
export const REDIRECTION = {
  HTTP_MULTIPLE_CHOICES: {
    code: 300,
    label: "300 Multiple Choices"
  },
  HTTP_MOVED_PERMANENTLY: {
    code: 301,
    label: "301 Moved Permanently"
  },
  HTTP_FOUND: {
    code: 302,
    label: "302 Found"
  },
  HTTP_SEE_OTHER: {
    code: 303,
    label: "303 See Other"
  },
  HTTP_NOT_MODIFIED: {
    code: 304,
    label: "304 Not Modified"
  },
  HTTP_USE_PROXY: {
    code: 305,
    label: "305 Use Proxy"
  },
  HTTP_TEMPORARY_REDIRECT: {
    code: 307,
    label: "307 Temporary Redirect"
  },
  HTTP_PERMANENT_REDIRECT: {
    code: 308,
    label: "308 Permanent Redirect"
  }
};

/**
 * Message type: Client Error
 */
export const CLIENT_ERROR = {
  HTTP_BAD_REQUEST: {
    code: 400,
    label: "400 Bad Request"
  },
  HTTP_UNAUTHENTICATED: {
    code: 401,
    label: "401 Unauthorized"
  },
  HTTP_PAYMENT_REQUIRED: {
    code: 402,
    label: "402 Payment Required"
  },
  HTTP_UNAUTHORIZED: {
    code: 403,
    label: "403 Forbidden"
  },
  HTTP_NOT_FOUND: {
    code: 404,
    label: "404 Not Found"
  },
  HTTP_METHOD_NOT_ALLOWED: {
    code: 405,
    label: "405 Method No Allowed"
  },
  HTTP_NOT_ACCEPTABLE: {
    code: 406,
    label: "406 Not Acceptable"
  },
  HTTP_PROXY_AUTHENTICATION_REQUIRED: {
    code: 407,
    label: "407 Proxy Authentication Required"
  },
  HTTP_REQUEST_TIMEOUT: {
    code: 408,
    label: "408 Request Time-out"
  },
  HTTP_CONFLICT: {
    code: 409,
    label: "409 Conflict"
  },
  HTTP_GONE: {
    code: 410,
    label: "410 Gone"
  },
  HTTP_LENGTH_REQUIRED: {
    code: 411,
    label: "411 Length Required"
  },
  HTTP_PRECONDITION_FAILED: {
    code: 412,
    label: "412 Precondition Failed"
  },
  HTTP_REQUEST_ENTITY_TOO_LARGE: {
    code: 413,
    label: "413 Payload Too Large"
  },
  HTTP_REQUEST_URI_TOO_LONG: {
    code: 414,
    label: "414 URI Too Long"
  },
  HTTP_UNSUPPORTED_MEDIA_TYPE: {
    code: 415,
    label: "415 Unsupported Media Type"
  },
  HTTP_REQUESTED_RANGE_NOT_SATISFIABLE: {
    code: 416,
    label: "416 Range Not Satisfiable"
  },
  HTTP_EXPECTATION_FAILED: {
    code: 417,
    label: "417 Expectation Failed"
  },
  HTTP_IM_A_TEAPOT: {
    code: 418,
    label: "418 I'm a teapot"
  },
  HTTP_UNPROCESSABLE_ENTITY: {
    code: 422,
    label: "422 Unprocessable Entity"
  },
  HTTP_LOCKED: {
    code: 423,
    label: "423 Locked"
  },
  HTTP_FAILED_DEPENDENCY: {
    code: 424,
    label: "424 Failed Dependency"
  },
  HTTP_UPGRADE_REQUIRED: {
    code: 426,
    label: "426 Upgrade Required"
  },
  HTTP_PRECONDITION_REQUIRED: {
    code: 428,
    label: "428 Precondition Required"
  },
  HTTP_TOO_MANY_REQUESTS: {
    code: 429,
    label: "429 Too Many Requests"
  },
  HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE: {
    code: 431,
    label: "431 Request Header Fields Too Large"
  },
  HTTP_UNAVAILABLE_FOR_LEGAL_REASONS: {
    code: 451,
    label: "451 Unavailable For Legal Reasons"
  }
};

/**
 * Message type: Server Error
 */
export const SERVER_ERROR = {
  HTTP_INTERNAL_SERVER_ERROR: {
    code: 500,
    label: "500 Internal Server Error"
  },
  HTTP_NOT_IMPLEMENTED: {
    code: 501,
    label: "501 Not Implemented"
  },
  HTTP_BAD_GATEWAY: {
    code: 502,
    label: "502 Bad Gateway"
  },
  HTTP_SERVICE_UNAVAILABLE: {
    code: 503,
    label: "503 Service Unavailable"
  },
  HTTP_GATEWAY_TIMEOUT: {
    code: 504,
    label: "504 Gateway Time-out"
  },
  HTTP_HTTP_VERSION_NOT_SUPPORTED: {
    code: 505,
    label: "505 HTTP Version not supported"
  },
  HTTP_INSUFFICIENT_STORAGE: {
    code: 507,
    label: "507 Insufficient Storage"
  },
  HTTP_LOOP_DETECTED: {
    code: 508,
    label: "508 Loop Detected"
  },
  HTTP_NETWORK_AUTHENTICATION_REQUIRED: {
    code: 511,
    label: "511 Network Authentication Required"
  }
};