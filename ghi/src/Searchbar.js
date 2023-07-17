import React from "react";
// import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
return (
    <div className="column is-10">
    <div className="field has-addons">
        <div className="control">
        <button className="button is-purple">
            <span className="icon is-small">
            <div className="has-text-black" /><div/>
            </span>
        </button>
        </div>
        <div className="control">
        <input
            className="input"
            type="text"
            placeholder="Search"
            aria-label="Search"
        />
        </div>
    </div>
    </div>
);
};

export default SearchPage;

// import React from "react";
// import { MDBCol, MDBIcon } from "mdbreact";

// const SearchPage = () => {
// return (
//     <MDBCol md="6">
//     <div className="input-group md-form form-sm form-1 pl-0">
//         <div className="input-group-prepend">
//         <span className="input-group-text purple lighten-3" id="basic-text1">
//             <MDBIcon className="text-white" icon="search" />
//         </span>
//         </div>
//         <input
//         className="form-control my-0 py-1"
//         type="text"
//         placeholder="Search"
//         aria-label="Search"
//         />
//     </div>
//     </MDBCol>
// );
// };

// export default SearchPage;
