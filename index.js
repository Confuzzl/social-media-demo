async function fetchUser(i) {
    return (
        await fetch(`https://jsonplaceholder.typicode.com/users/${i}`)
    ).json();
}

async function fetchRandomImage() {
    return (
        await fetch(
            `https://jsonplaceholder.typicode.com/photos/${randomInt(1, 5000)}`
        )
    ).json();
}

async function fetchRandomUserPost(i) {
    return (
        await fetch(
            `https://jsonplaceholder.typicode.com/posts/${
                (i - 1) * 10 + randomInt(1, 10)
            }`
        )
    ).json();
}

async function fetchRandomComment() {
    return (
        await fetch(
            `https://jsonplaceholder.typicode.com/comments/${Math.floor(
                randomInt(1, 500)
            )}`
        )
    ).json();
}

function removeNewLines(str) {
    return str.replace(/\n/g, " ");
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function populateMain() {
    // return;
    for (let i = 1; i <= 10; i++) {
        const postElement = document.createElement("div");
        postElement.id = i;
        postElement.classList += "post";
        fetchUser(i).then((p) => {
            const postHeader = document.createElement("div");
            postHeader.classList += "post_header";
            const postHeaderPicture = document.createElement("div");
            postHeaderPicture.classList += "post_header_picture";
            const postHeaderUsername = document.createElement("p");
            postHeaderUsername.classList += "post_header_username";
            postHeaderUsername.innerText = p["username"];
            const postHeaderFollow = document.createElement("p");
            postHeaderFollow.classList += "post_header_follow";
            postHeaderFollow.innerText = "Follow";
            postHeader.appendChild(postHeaderPicture);
            postHeader.appendChild(postHeaderUsername);
            postHeader.appendChild(postHeaderFollow);
            postElement.appendChild(postHeader);

            fetchRandomImage().then((p) => {
                const imageHolder = document.createElement("div");
                imageHolder.classList += "post_image_holder";
                const imageElement = new Image();
                imageElement.classList += "post_image";
                imageElement.src = p["url"];
                imageHolder.appendChild(imageElement);
                postElement.appendChild(imageHolder);
            });

            const interactions = document.createElement("div");
            interactions.classList += "interactions";
            const likes = document.createElement("p");
            likes.classList += "likes";
            likes.innerText += formatter.format(randomInt(0, 10_000));
            const likesWord = document.createElement("span");
            likesWord.innerText = " likes";
            likes.appendChild(likesWord);
            interactions.appendChild(likes);
            const shares = document.createElement("p");
            shares.classList += "shares";
            shares.innerText += formatter.format(randomInt(0, 1_000));
            const sharesWord = document.createElement("span");
            sharesWord.innerText = " shares";
            shares.appendChild(sharesWord);
            interactions.appendChild(shares);
            postElement.appendChild(interactions);

            fetchRandomUserPost(i).then((p) => {
                const postTitleHeader = document.createElement("div");
                postTitleHeader.classList += "post_title";
                const postTitleText = document.createElement("p");
                postTitleText.innerText = p["title"];
                postTitleHeader.appendChild(postTitleText);
                postElement.appendChild(postTitleHeader);

                const postDescription = document.createElement("div");
                postDescription.classList += "post_description";
                const postDescriptionText = document.createElement("p");
                postDescriptionText.innerText = removeNewLines(p["body"]);
                const postDescriptionDivider = document.createElement("div");
                postDescriptionDivider.classList += "post_divider";
                postDescription.appendChild(postDescriptionText);
                postDescription.appendChild(postDescriptionDivider);
                postElement.appendChild(postDescription);

                const commentsHolder = document.createElement("div");
                commentsHolder.classList += "comments_holder";
                const comments = document.createElement("div");
                comments.classList += "comments_list";

                const commentCount = randomInt(0, 10);
                for (let j = 0; j < commentCount; j++) {
                    fetchRandomComment().then((p) => {
                        const comment = document.createElement("div");
                        comment.classList += "comment";
                        const commentText = document.createElement("p");
                        commentText.innerText = removeNewLines(p["body"]);
                        comment.appendChild(commentText);
                        comments.appendChild(comment);
                    });
                }
                commentsHolder.appendChild(comments);

                postElement.appendChild(commentsHolder);

                const commentsCount = document.createElement("p");
                commentsCount.classList += "comments";
                commentsCount.innerText += commentCount;
                const commentsWord = document.createElement("span");
                commentsWord.innerText = " comments";
                commentsCount.appendChild(commentsWord);
                interactions.appendChild(commentsCount);
            });

            const commentBoxHolder = document.createElement("div");
            commentBoxHolder.classList += "comment_box_holder";
            const commentBox = document.createElement("input");
            commentBox.classList += "comment_box";
            commentBox.placeholder = "Comment";
            commentBox.type = "text";
            commentBoxHolder.appendChild(commentBox);
            postElement.appendChild(commentBoxHolder);

            document.querySelector("main").appendChild(postElement);
        });
    }
}
