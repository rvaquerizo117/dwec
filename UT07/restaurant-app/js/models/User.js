// js/models/User.js

class User {
    async loadUsers() {
        const response = await fetch('data/users.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.users;
    }

    async validateCredentials(username, password) {
        const users = await this.loadUsers();
        return users.some(user => user.username === username && user.password === password);
    }
}

export default User;
