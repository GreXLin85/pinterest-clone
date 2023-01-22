import { PostService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("RoleService", () => {
    let postId: number;
    let commentId: number;

    it("is creating a post", async () => {
        const post = await PostService.createPost({
            title: "TEST_POST",
            content: "TEST_CONTENT",
            image: "TEST_IMAGE",
            authorId: 1,
        })

        postId = post.id;

        expect(post.title).toBe("TEST_POST");
    })

    it("is getting a post by id", async () => {
        const getPost = await PostService.getPostById(postId)

        expect(getPost?.title).toBe("TEST_POST");
    })

    it("is searching posts by title", async () => {
        const searchPosts = await PostService.searchPostsByTitle("TEST_")

        expect(searchPosts[0]).toHaveProperty("id");
    })

    it("is getting all posts", async () => {
        const getPosts = await PostService.getPosts()

        expect(getPosts[0]).toHaveProperty("id");
    })

    it("is updating a post", async () => {
        const updatePost = await PostService.updatePost(postId, {
            title: "TEST_POST_UPDATED"
        })

        expect(updatePost?.title).toBe("TEST_POST_UPDATED");
    })

    it("is deleting a post", async () => {
        const deletePost = await PostService.deletePost(postId)

        expect(deletePost.id).toBeDefined();
    })

    afterAll(async () => {
        return await prisma.$disconnect()
    })

})