/**
 * Global TypeScript Types
 */

export interface User {
  id: string
  email: string
  contracts?: Contract[]
}

export interface Contract {
  id: string
  userId: string
  uploadedAt: Date
  content: string
  extractedData: ContractData
}

export interface ContractData {
  startDate: Date
  endDate: Date
  breakClause?: string
  noticePeriod?: string
  rentAmount?: string
} 