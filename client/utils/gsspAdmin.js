import AuthService from "../services/auth.service";

export function withAuth(gssp) {
    return async (context) => {

      const { req, res } = context

      if(!req.headers.cookie){
        return {
          redirect: {
            destination: '/admin',
            permanent: false,
          },
        }
      }
      
      const response = await AuthService.whoami(req.headers.cookie)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.status
        })

      if(response === 401 || response.role === 2){
        return {
          redirect: {
            destination: '/admin',
            permanent: false,
          },
        }
      };

        const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data
        
        // Pass page-specific props along with user data from `withAuth` to component
        return {
            props: {
                ...gsspData.props,
                currentUser: response
            }
        };
    }
}