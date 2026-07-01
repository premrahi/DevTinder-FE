const UserCard = ({ user }) => {
  
    const {age , gender , firstName , lastName , about , photoUrl } = user ;

  return (
    <div className="card bg-gray-600 rounded-4xl w-96 shadow-sm mx-auto my-10 ">
      <figure className="my-6 ">
        <img className="w-full h-auto mx-6 rounded-2xl hover:cursor-pointer" src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl"> {firstName + " " + lastName} </h2>
        <h3>Gender : <span className="text-lg">{gender}</span> </h3>
        <h3>Age : {age}</h3>
        <p>
         {about}
        </p>
        <div className="card-actions justify-between my-2">
          <button className="btn btn-primary hover:cursor-pointer rounded-xl">Ignore</button>
          <button className="btn btn-primary rounded-xl hover:cursor-pointer">send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
