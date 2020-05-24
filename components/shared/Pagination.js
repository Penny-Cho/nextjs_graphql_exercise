import Pagination from "react-js-pagination";

const AppPagination = ({ count, pageNum, pageSize, onChange }) => {
    return (
        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={pageNum}
            itemsCountPerPage={pageSize}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={page => onChange(page, pageSize)}
        />
    );
};

export default AppPagination;
