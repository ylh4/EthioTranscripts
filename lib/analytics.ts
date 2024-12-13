type EventParams = {
  action: string
  category: string
  label?: string
  value?: number
}

export const trackEvent = ({ action, category, label, value }: EventParams) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Predefined events
export const trackDocumentRequest = (documentType: string) => {
  trackEvent({
    action: 'submit_document_request',
    category: 'Document Requests',
    label: documentType,
  })
}

export const trackStatusCheck = (referenceNumber: string) => {
  trackEvent({
    action: 'check_request_status',
    category: 'Status Checks',
    label: referenceNumber,
  })
}

export const trackServiceView = (serviceName: string) => {
  trackEvent({
    action: 'view_service',
    category: 'Services',
    label: serviceName,
  })
}

export const trackContactForm = () => {
  trackEvent({
    action: 'submit_contact_form',
    category: 'Contact',
  })
} 