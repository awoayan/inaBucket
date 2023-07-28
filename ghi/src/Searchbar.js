import React from "react";

const SearchPage = () => {
    return (
        <div className="column is-12">
            <div className="field has-addons">
                <div className="control">
                    <button className="button is-purple">
                        <span className="icon is-small">
                            <div className="has-text-black" /><div />
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

