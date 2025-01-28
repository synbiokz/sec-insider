// lib/sec/client.ts

/**
 * Client for interacting with SEC EDGAR API
 * Handles fetching Form 4 filings and related data
 */

interface RawFiling {
  accessionNumber: string;
  filingDate: string;
  primaryDocument: string;
  primaryDocDescription: string;
  filingHref: string;
  documentFormatFiles: Array<{
    documentUrl: string;
    type: string;
    description: string;
    size: number;
  }>;
}

interface FilingsList {
  filings: RawFiling[];
  hasMore: boolean;
  nextPage?: string;
}

export class SECClient {
  private baseUrl = 'https://www.sec.gov/Archives/edgar/data';
  private userAgent = 'SECInsider/1.0.0';
  
  constructor() {
    if (!process.env.SEC_API_KEY) {
      console.warn('SEC API key not found. Using public access with rate limits.');
    }
  }

  /**
   * Fetches a specific Form 4 filing by CIK and accession number
   */
  async getFiling(cik: string, accessionNumber: string): Promise<RawFiling> {
    const formattedCik = this.formatCik(cik);
    const url = `${this.baseUrl}/${formattedCik}/${accessionNumber}/xslF345X03/${accessionNumber}.xml`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          ...(process.env.SEC_API_KEY && { 'X-API-Key': process.env.SEC_API_KEY })
        }
      });

      if (!response.ok) {
        throw new Error(`SEC API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      return this.parseFilingXML(data);
    } catch (error) {
      console.error('Error fetching filing:', error);
      throw new Error(`Failed to fetch filing: ${error.message}`);
    }
  }

  /**
   * Fetches a list of Form 4 filings for a given date range
   */
  async getFilingsList(startDate: Date, endDate?: Date): Promise<FilingsList> {
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = endDate ? this.formatDate(endDate) : formattedStartDate;
    
    const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcomplete&type=4&dateb=${formattedEndDate}&datea=${formattedStartDate}&owner=include&count=100`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          ...(process.env.SEC_API_KEY && { 'X-API-Key': process.env.SEC_API_KEY })
        }
      });

      if (!response.ok) {
        throw new Error(`SEC API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      return this.parseFilingsList(data);
    } catch (error) {
      console.error('Error fetching filings list:', error);
      throw new Error(`Failed to fetch filings list: ${error.message}`);
    }
  }

  /**
   * Helper method to format CIK numbers with leading zeros
   */
  private formatCik(cik: string): string {
    return cik.padStart(10, '0');
  }

  /**
   * Helper method to format dates for SEC API requests
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  }

  /**
   * Parses XML response from SEC API into structured data
   */
  private parseFilingXML(xmlText: string): RawFiling {
    // TODO: Implement XML parsing logic
    // Will use a proper XML parser library
    throw new Error('XML parsing not yet implemented');
  }

  /**
   * Parses the filings list HTML response into structured data
   */
  private parseFilingsList(html: string): FilingsList {
    // TODO: Implement HTML parsing logic
    // Will use a proper HTML parser library
    throw new Error('HTML parsing not yet implemented');
  }
}

export default SECClient;