import React from "react";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";

const SearchPage = () => {
    return (
        <div className="column is-12 mt-2 mr-2">
            <div className="field has-addons">
                <div className="control">
                    <button className="button is-info">
                        <span className="icon">
                            <Icon path={mdiMagnify} size={1} />
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

