const users = [];


//adduser, removeUser, Getuser, getusersinroom

const addUser = ({ id, username, room }) => {
    //clear the data 
    username = username.trim().toLowerCase(),
    room = room.trim().toLowerCase()


    //validate the data
    if (!username || !room) {
        return {
            error: 'username and room are required'
        }
    }

    //check for existing user 
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //validate username
    if (existingUser) {
        return {
            error: 'Username is in use..!'
        }
    }

    // store user 
     const user = { id, username, room }
     users.push(user)
     return { user }

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    console.log(index)

    if (index !== -1) {
        return users.splice(index,1)[0];     
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getusersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

// addUser({
//     id: 22,
//     username: 'sujith',
//     room: 'odepoi'
// })

// addUser({
//     id: 23,
//     username: 'sanjay',
//     room: 'odepoi'
// })
// addUser({
//     id: 12,
//     username: 'sharath',
//     room: 'ijes'
// })
// // console.log(users)

// const res = addUser({
//     id:22,
//     username: 'sujith',
//     room:'odepoi'
// })

// const removedUsers = removeUser(22);

// console.log(removedUsers);

// console.log(users)

// const user = getUser(12)
// console.log(user)

// const userlist = getusersInRoom('iqjes')

// console.log(userlist)
module.exports = {
    addUser,
    removeUser,
    getUser,
    getusersInRoom
}