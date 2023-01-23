import { CommentService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("CommentService", () => {
    let postId: number;
    let commentId: number;

    beforeAll(async () => {
        const post = await prisma.post.create({
            data: {
                title: "Test post",
                content: "Test content",
                image: "Test image",
                author: {
                    connect: {
                        id: 1,
                    }
                }
            },
        });
        postId = post.id;
    });

    afterAll(async () => {
        await prisma.post.delete({
            where: {
                id: postId,
            },
        })

        await prisma.$disconnect();
    });

    it("should add comment to post", async () => {
        const comment = await new CommentService().addCommentToPost(postId, 1, "Test comment");
        expect(comment).toHaveProperty("id");
        commentId = comment.id;
    })

    it("should get comment by id", async () => {
        const comment = await new CommentService().getCommentById(commentId);
        expect(comment).toHaveProperty("id");
    })

    it("should get comments by post id", async () => {
        const comments = await new CommentService().getCommentsByPostId(postId);
        expect(comments).toHaveLength(1);
    })

    it("should edit comment", async () => {
        const comment = await new CommentService().editComment(commentId, "Edited comment");
        expect(comment.content).toBe("Edited comment");
    })

    it("should remove comment from post", async () => {
        const comment = await new CommentService().removeCommentFromPost(commentId);
        expect(comment).toHaveProperty("id");
    })

})