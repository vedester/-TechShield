
import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
}

export interface ContactInfo {
  website: string;
  email: string;
  phones: string[];
}