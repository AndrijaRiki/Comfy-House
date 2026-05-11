class User {
    fname = "";
    lname = "";
    email = "";
    password = "";
    //api_url = "https://64be2b012320b36433c8261b.mockapi.io";
    api_url = "https://684a2a23165d05c5d357d7c3.mockapi.io";

    create() {
        let data = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            password: this.password
        };
        data = JSON.stringify(data);

        fetch(this.api_url + "/Users", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.user_id = data.id;
            session.startSession();
        })
        document.querySelector("#name").innerHTML = `${this.fname} ${this.lname}`;
    }

    async get(user_id) {
        let response = await fetch(this.api_url + "/Users/" + user_id);
        let data = await response.json();
        return data;
    }

    login() {
        fetch(this.api_url + '/Users')
        .then(response => response.json())
        .then(data => {
            let loginSuccess = 0;
            data.forEach(db_user => {
                if(db_user.email === this.email && db_user.password === this.password) {
                    let session = new Session();
                    session.user_id = db_user.id;
                    session.startSession();
                    loginSuccess = 1;
                    document.querySelector("#name").innerHTML = `${db_user.fname} ${db_user.lname}`    
                }
            });

            if(!loginSuccess)
                alert("Wrong email or password!");
            else
                alert("Successfully logged in!");
        });
    }

    delete() {
        let session = new Session();
        let session_id = session.getSession();

        fetch(this.api_url + "/Users/" + session_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            session = new Session();
            alert("Account deleted");
            session.destroySession();
        })
    }
}