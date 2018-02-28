import { Component } from '@angular/core';
import { Router }  from '@angular/router';

import { CommonService } from '../services/common/common.service';

import { Post } from '../models/post/post.model';
import { User } from '../models/user/user.model';

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html'
})
export class BlogComponent {
    newPost = {
        text: null as string,
        title: null as string
    };
    posts: Post[] = [];
    loginedUser: User = null;
    
    constructor(private commonService: CommonService, private router: Router) {
        this.posts = this.commonService.data.posts;
        this.loginedUser = this.commonService.data.loginedUser;
    }
    
    createPost() {
        if(this.canCreate) {
            this.posts.push(JSON.parse(JSON.stringify(this.newPost)));
            this.commonService.data.posts = this.posts;
            localStorage.setItem('data', JSON.stringify(this.commonService.data));
        } else {
            alert('Fill all fields.');
        }
    }
    
    deletePost(index: any) {
        this.posts.splice(index, 1);
        this.commonService.data.posts = this.posts;
        localStorage.setItem('data', JSON.stringify(this.commonService.data));
    }
    
    editPostElement(event: any, post: Post, element: string) {
        post.edit[element]['value'] = event['target']['value'];
        post.edit[element]['value'] == post[element] ?
            post.edit[element]['status'] = false :
                post.edit[element]['status'] = true;
        post.canSaveEditing = post.edit.title.value && post.edit.text.value &&
            (post.edit.title.status || post.edit.text.status) ? true : false;
    }
    
    logout() {
        this.commonService.data.loginedUser = null;
        localStorage.setItem('data', JSON.stringify(this.commonService.data));
        this.router.navigate(['login']);
    }
    
    savePostEditing(selectedPost: Post) {
        if(selectedPost.canSaveEditing) {
            let posts = [];
            selectedPost.title = selectedPost.edit.title.value;
            selectedPost.text = selectedPost.edit.text.value;
            for (let post of this.posts) {
                posts.push({title: post.title, text: post.text});
            }
            this.commonService.data.posts = posts;
            localStorage.setItem('data', JSON.stringify(this.commonService.data));
            selectedPost.editing = false;
        } else {
            alert('Fill all fields and make changes.');
        }
    }
    
    startPostEditing(post: Post) {
        post.canSaveEditing = false;
        post.editing = true;
        post.edit = {
            text: {
                status: false,
                value: post.text
            },
            title: {
                status: false,
                value: post.title
            }
        };
    }
    
    get canCreate() {
        return this.newPost.text && this.newPost.title ? true : false;
    }
}
