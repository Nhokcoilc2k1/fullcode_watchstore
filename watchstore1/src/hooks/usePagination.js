import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { generateRange } from "~/ultils/helpers";

function usePagination(totalProductCount, currentPage, limit = null, siblingCount = 1) {
    const paginationArray = useMemo(() => {
        let pageSize;

        if(limit){
             pageSize = limit || 10
        }else{
             pageSize = process.env.REACT_APP_LIMIT || 10
        }
        // const pageSize = process.env.REACT_APP_LIMIT || 10
        const paginationCount = Math.ceil(totalProductCount / pageSize)
        const totalPaginationItem = siblingCount + 5

        if(paginationCount <= totalPaginationItem) return generateRange(1, paginationCount)

        const isShowLeft = currentPage - siblingCount > 2
        const isShowRight = currentPage + siblingCount < paginationCount - 1

        if(isShowLeft && !isShowRight){
            const rightStart = paginationCount - 4
            const rightRange = generateRange(rightStart, paginationCount)

            return [1, <FontAwesomeIcon icon={faEllipsis}/>, ...rightRange]
        }

        if(!isShowLeft && isShowRight){
            const leftRang = generateRange(1,5)
            return [...leftRang, <FontAwesomeIcon icon={faEllipsis}/>, paginationCount]
        }

        const siblingLeft = Math.max(currentPage - siblingCount, 1)
        const siblingRight = Math.min(currentPage + siblingCount, paginationCount)

        if(isShowLeft && isShowRight){
            const middleRange = generateRange(siblingLeft, siblingRight)
            return [1, <FontAwesomeIcon icon={faEllipsis}/>, ...middleRange, <FontAwesomeIcon icon={faEllipsis}/>, paginationCount]
        }




    }, [totalProductCount, currentPage, siblingCount])

    return paginationArray;
}

export default usePagination;
// fist + last + current + sibling + 2*DOTS
// min = 6 => sibling + 5
// totalPagination: 58, limitProduct = 10 => 5.8 => 6
// totalPaginationItem: sibling + 5
// sibling = 1

// [1,2,3,4,5,6]
// [1,...,6,7,8,9,10]
// [1,2,3,4,5,...,10]
// [1,...,5,6,7,...,10]