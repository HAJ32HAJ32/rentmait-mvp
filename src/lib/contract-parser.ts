interface ParsedContract {
  text: string;
  startDate?: string;
  endDate?: string;
  breakClauseText?: string;
  noticePeriodDays?: number;
  summary?: string;
}

export async function parseContractText(text: string): Promise<ParsedContract> {
  const result: ParsedContract = { text };

  // Convert text to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();

  // Date patterns
  const datePatterns = [
    // DD/MM/YYYY or DD-MM-YYYY
    /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/g,
    // Month DD, YYYY
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2}),?\s+(\d{4})/gi,
    // DD Month YYYY
    /(\d{1,2})\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})/gi
  ];

  // Find all dates in the text
  const dates: string[] = [];
  datePatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    dates.push(...matches);
  });

  // Look for start date keywords
  const startDateKeywords = [
    'commencement',
    'start',
    'begin',
    'effective',
    'from',
    'starting'
  ];

  // Look for end date keywords
  const endDateKeywords = [
    'end',
    'expiry',
    'termination',
    'until',
    'expiration',
    'conclusion'
  ];

  // Find start and end dates
  for (const date of dates) {
    const context = text.substring(
      Math.max(0, text.indexOf(date) - 100),
      Math.min(text.length, text.indexOf(date) + 100)
    ).toLowerCase();

    if (startDateKeywords.some(keyword => context.includes(keyword))) {
      result.startDate = date;
    } else if (endDateKeywords.some(keyword => context.includes(keyword))) {
      result.endDate = date;
    }
  }

  // Look for break clause
  const breakClauseKeywords = [
    'break clause',
    'break notice',
    'early termination',
    'termination notice',
    'notice to quit',
    'notice period'
  ];

  for (const keyword of breakClauseKeywords) {
    if (lowerText.includes(keyword)) {
      // Find the section containing the break clause
      const keywordIndex = lowerText.indexOf(keyword);
      const startIndex = Math.max(0, keywordIndex - 200);
      const endIndex = Math.min(text.length, keywordIndex + 500);
      result.breakClauseText = text.substring(startIndex, endIndex).trim();
      break;
    }
  }

  // Look for notice period
  const noticePeriodPattern = /(\d+)\s+(day|week|month)s?\s+notice/gi;
  const noticeMatch = text.match(noticePeriodPattern);
  if (noticeMatch) {
    const [_, number, unit] = noticeMatch[0].match(/(\d+)\s+(day|week|month)s?/i) || [];
    if (number && unit) {
      const days = parseInt(number);
      const multiplier = unit.toLowerCase() === 'week' ? 7 : unit.toLowerCase() === 'month' ? 30 : 1;
      result.noticePeriodDays = days * multiplier;
    }
  }

  // Generate a summary
  const summaryParts = [];
  if (result.startDate) summaryParts.push(`Start Date: ${result.startDate}`);
  if (result.endDate) summaryParts.push(`End Date: ${result.endDate}`);
  if (result.noticePeriodDays) summaryParts.push(`Notice Period: ${result.noticePeriodDays} days`);
  if (result.breakClauseText) summaryParts.push('Contains break clause');
  
  result.summary = summaryParts.join(' | ');

  return result;
} 