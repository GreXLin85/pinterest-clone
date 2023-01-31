import { PostService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("PostService", () => {
    let postId: number;
    const postService = new PostService()

    it("is creating a post", async () => {
        const post = await postService.createPost({
            title: "TEST_POST",
            content: "TEST_CONTENT",
            image: "TEST_IMAGE",
            authorId: 1,
        })

        postId = post.id;

        expect(post.title).toBe("TEST_POST");
    })

    it("is getting a post by id", async () => {
        const getPost = await postService.getPostById(postId)

        expect(getPost?.title).toBe("TEST_POST");
    })

    it("is searching posts by title", async () => {
        const searchPosts = await postService.searchPostsByTitle("TEST_")

        expect(searchPosts[0]).toHaveProperty("id");
    })

    it("is getting all posts", async () => {
        const getPosts = await postService.getPosts()

        expect(getPosts[0]).toHaveProperty("id");
    })

    it("is updating a post", async () => {
        const updatePost = await postService.updatePost(postId, {
            title: "TEST_POST_UPDATED"
        })

        expect(updatePost?.title).toBe("TEST_POST_UPDATED");
    })

    it("is deleting a post", async () => {
        const deletePost = await postService.deletePost(postId)

        expect(deletePost.id).toBeDefined();
    })

    afterAll(async () => {
        return await prisma.$disconnect()
    })

})