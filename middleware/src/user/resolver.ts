const users=[
    {
        id:"1",
        name:"Swetha"
    },
    {
        id:"2",
        name:"Ni"
    },
    {
        id:"3",
        name:"sk"
    }
]
export const getUsers = ()=>{

    return users;
}

export default { Query : { getUsers } }