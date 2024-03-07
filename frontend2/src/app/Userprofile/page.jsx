
export const getSeverSideProps = async (context) => {
    try {
        const session= await getSession({req: context.req});
    } catch (error) {
        
    }
}

const UserProfilePage = () => {
    return (
        <div>
       <h1>User Profile</h1> 
        </div>
    );
    }
    export default UserProfilePage;