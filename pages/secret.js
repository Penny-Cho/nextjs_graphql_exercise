import withApollo from "@/hoc/withApollo";
import withAuth from "../hoc/withAuth";
import BaseLayout from "../layouts/BaseLayout";

const Secret = withAuth(() => {
    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Secret</h1>
                        secret page, only authenticated users allowed <br />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}, ["admin"]);

export default withApollo(Secret);

// 다른 방식 (withApollo 안에 더 넣는 방식)

// const Secret = ({ displayMessage }) => {
//     return (
//         <>
//             <div className="bwm-form mt-5">
//                 <div className="row">
//                     <div className="col-md-5 mx-auto">
//                         <h1 className="page-title">Secret</h1>
//                         secret page, only authenticated users allowed <br />
//                         {displayMessage()}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default withApollo(withAuth(Secret));
