const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.detelePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

//commentaires
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment/:id", postController.editComment);
router.patch("/delete-comment/:id", postController.deleteComment);

module.exports = router;
