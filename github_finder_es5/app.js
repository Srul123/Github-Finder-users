//GitHub class
function GitHub(client_id, client_secret) {
    this.client_id = 'abed69e5993c1543e52c';
    this.client_secret = 'c75a853c2a1cc78ed6fcfeefc4ec38d484058e22';
}

GitHub.prototype.get_user = async function (user) {
    const profile_response = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profile_response.json();

    return {
        profile: profile
    };
}



//UI class

function UI() {
    this.profile = document.querySelector('#profile');
}


UI.prototype.showProfile = function (user) {
    this.profile.innerHTML = `
            <div class='card'>
                <div class='row'>
                    <div class='col-3'>
                        <img class='img_show' height="300" width="300" src='${user.avatar_url}'>
                        <br>
                        <a href='${user.html_url}' target='_blank' class='view_profile'> View Profile </a>
                    </div>
                    <div class='col-9'>
                       <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class=" badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class=" badge-success">Followers: ${user.followers}</span>
                        <span class=" badge-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
       `;
}

UI.prototype.showAlert = function (message, class_name) {
    this.clearAlert();
    console.log('showAlert');
    let div = document.createElement('div');
    div.className = class_name;

    div.appendChild(document.createTextNode(message));
    let add_to = document.querySelector('.two');

    add_to.insertBefore(div, add_to.childNodes[0]);

    setTimeout(function(){
        div.remove();
     } ,3000);
}

UI.prototype.clearProfile = function () {
    console.log('clearProfile');
    this.profile.innerHTML = '';
}

UI.prototype.clearAlert = function () {
    const curAlert = document.querySelector('.error');
    if (curAlert) {
        curAlert.remove();
    }

}

//app

//Search input
const github = new GitHub();
const ui = new UI();
let searcUser = document.getElementById('search_input');

//add event listeners

searcUser.addEventListener('keypress', (e) => {
    const user_text = e.target.value;

    if (user_text !== '') {
        github.get_user(user_text)
            .then(result => {
                if (result.profile.message == 'Not Found') {
                    //show alert
                    console.log('call to erorroro');

                    ui.showAlert('Not found', 'error');
                    ui.clearProfile();

                } else {
                    //show profile
                    ui.showProfile(result.profile);

                }
            })
    } else {
        // clear profile
        ui.clearProfile();

    }
});
