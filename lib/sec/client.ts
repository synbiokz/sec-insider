import * as cheerio from 'cheerio';

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