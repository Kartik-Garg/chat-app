const users = []

//addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room})=>{
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if (!username || !room){
        return{
            error: 'Username and room are required'
        }
    }

    //check for exisiting user
    const exisitingUser = users.find((user)=>{
        return user.room === room && user.username == username
    })

    //validate username
    if(exisitingUser){
        return{
            error:'Username is already in use'
        }
    }

    //store user
    const user = {id, username, room}
    users.push(user)
    return{user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id == id
    })

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}



//getUser
const getUser = (id)=>{
    //first check if user exists or not
    const user = users.find((user)=>{
        if(user.id === id){
            return user
        }
    })
    if(!user){
        return{
            error:'User does not exist'
        }
    }
    return {
        user
    }
}

//getUsersInRoom
const getUsersInRoom = (room)=>{
    // const usersInRoom = [] 
    // users.find((user)=>{
    //     if(user.room === room){
    //         usersInRoom.push(user)
    //     }
    // })
    // return usersInRoom
    room = room.trim().toLowerCase()
    return users.filter((user)=>user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}