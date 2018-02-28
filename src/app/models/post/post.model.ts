export class Post {
    canSaveEditing?: boolean;
    edit?: {
        text: {
            status: boolean,
            value: any
        },
        title: {
            status: boolean,
            value: any
        }
    };
    editing?: boolean;
    text: any;
    title: any;
}
