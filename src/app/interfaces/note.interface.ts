export interface INote {
    id: number;
    note: string;
    bgColor: string;
}

export interface ISocketNotes {
    notes: INote[];
}
