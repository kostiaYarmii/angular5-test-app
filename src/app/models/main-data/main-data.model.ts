import { Post } from '../post/post.model';
import { User } from '../user/user.model';

export class MainData {
    loginedUser: User;
    posts: Post[];
    users: User[];
}
