import { Component } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector : "app-post",
    templateUrl : "./post.component.html"
})
export class postComponent{
    posts:any[];
    private url = "https://jsonplaceholder.typicode.com/posts"
    constructor(public http:Http){
        http.get(this.url).subscribe((res)=>{
            console.log(res.json());
            this.posts=res.json();
        })
    }
    //create post
    createPosts(input:HTMLInputElement){
        let post = {title : input.value}
        input.value = " ";
        this.http.post(this.url, JSON.stringify(post)).subscribe((res)=>{
        post['id']=res.json().id;
        this.posts.splice(0,0,post);
        })
    }
    //update post
    updatePost(post){
        this.http.put(this.url +"/"+ post.id, JSON.stringify(post)).subscribe(res=>{
            console.log(res.json());
        })
    }
    //Remove post
    deletePost(post){
        this.http.delete(this.url +"/"+ post.id).subscribe(res=>{
            let index = this.posts.indexOf(post);
            this.posts.splice(index, 1);
        })
    }
}