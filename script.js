let posts = [];
let editIndex = -1;

function savePost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const status = document.getElementById("status").value;

    if(title === "" || content === ""){
        alert("Please fill all fields");
        return;
    }

    const post = {
        title,
        content,
        status
    };

    if(editIndex === -1){
        posts.push(post);
    } else {
        posts[editIndex] = post;
        editIndex = -1;
    }

    clearForm();
    displayPosts();
}

function displayPosts() {

    const postList = document.getElementById("postList");
    const searchText =
        document.getElementById("search").value.toLowerCase();

    postList.innerHTML = "";

    posts
    .filter(post =>
        post.title.toLowerCase().includes(searchText))
    .forEach((post,index)=>{

        postList.innerHTML += `
            <div class="post">
                <h3>${post.title}</h3>
                <p class="status">${post.status}</p>

                <button onclick="viewPost(${index})">
                    View
                </button>

                <button onclick="editPost(${index})">
                    Edit
                </button>

                <button onclick="deletePost(${index})">
                    Delete
                </button>

                <div id="details-${index}"></div>
            </div>
        `;
    });
}

function viewPost(index){

    const detailDiv =
    document.getElementById(`details-${index}`);

    detailDiv.innerHTML = `
        <div class="details">
            <p>${posts[index].content}</p>
        </div>
    `;
}

function editPost(index){

    document.getElementById("title").value =
    posts[index].title;

    document.getElementById("content").value =
    posts[index].content;

    document.getElementById("status").value =
    posts[index].status;

    editIndex = index;
}

function deletePost(index){

    posts.splice(index,1);
    displayPosts();
}

function clearForm(){

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("status").value = "Draft";
}

document.getElementById("search")
.addEventListener("keyup", displayPosts);

displayPosts();
