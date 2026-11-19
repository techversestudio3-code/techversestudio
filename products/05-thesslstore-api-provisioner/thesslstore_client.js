/**
 * TheSSLStore Reseller Automated Provisioning Gateway
 * Developed for TechVerse LLC (techversestudio.com)
 */

class TheSSLStoreClient {
  constructor(partnerCode, authToken, isSandbox = true) {
    this.partnerCode = partnerCode;
    this.authToken = authToken;
    this.baseUrl = isSandbox
      ? 'https://sandbox-wbapi.thesslstore.com/rest'
      : 'https://api.thesslstore.com/rest';
  }

  /**
   * Helper to make authenticated requests to TheSSLStore API
   */
  async request(endpoint, payload = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const body = {
      AuthToken: this.authToken,
      PartnerCode: this.partnerCode,
      ...payload
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`TheSSLStore API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Check Partner Account Balance
   */
  async checkBalance() {
    return this.request('/billing/balance');
  }

  /**
   * Submit an Automated SSL Certificate Order
   */
  async createOrder({ productCode, validityYears = 1, csr, dcvMethod = 'DNS', approverEmail, technicalContact }) {
    const payload = {
      ProductCode: productCode, // e.g. 'positivessl', 'rapidssl', 'wildcardssl'
      Validity: validityYears,
      CSR: csr,
      DomainControlValidation: {
        DCVMethod: dcvMethod // 'DNS', 'HTTP_CSR_HASH', or 'EMAIL'
      },
      ApproverEmail: approverEmail,
      TechnicalContact: technicalContact,
      WebServerType: 'Apache2'
    };

    return this.request('/order/neworder', payload);
  }

  /**
   * Check Order Issuance & DCV Status
   */
  async getOrderStatus(theSSLStoreOrderId) {
    return this.request('/order/status', {
      TheSSLStoreOrderID: theSSLStoreOrderId
    });
  }

  /**
   * Download Issued Certificate & Intermediate Bundle
   */
  async downloadCertificate(theSSLStoreOrderId) {
    return this.request('/order/download', {
      TheSSLStoreOrderID: theSSLStoreOrderId
    });
  }
}

module.exports = TheSSLStoreClient;
