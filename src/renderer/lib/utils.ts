import moment from "moment"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDateString(input: any): string {
  return moment(input).format('YYYY-MM-DD')
}

export function toCurrency(input: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
    input,
  )
}
