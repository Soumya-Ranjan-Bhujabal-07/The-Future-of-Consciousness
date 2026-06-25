export interface Section {
  id: string;
  title: string;
  content: string[]; // Can contain paragraph text or specialized markup like lists or tables
}

export interface Chapter {
  number: number;
  id: string;
  title: string;
  sections: Section[];
}

export interface ActiveState {
  chapterId: string;
  sectionId?: string;
  progress: number;
}
