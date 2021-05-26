import moment from 'moment';
import React, { ChangeEvent, MouseEvent, useRef, useState, useEffect } from 'react';
import { Button, Overlay } from 'react-bootstrap';
import { MediaType, WorkoutFilterParams } from '../../schema/Workout';
import { getMediaTypes } from '../../services/workoutAPI';

interface FilterParams {
    filterParams: WorkoutFilterParams;
    setFilterParams(filterParams: WorkoutFilterParams) : void;
}

const WorkoutFilters = ({filterParams, setFilterParams}: FilterParams) => {
    const [ workoutFilterParams, setWorkoutFilterParams ] = useState<WorkoutFilterParams>(filterParams);
    const [ showFilter, setShowFilter ] = useState(false);
    const filterElement = useRef(null);
    const startDateLimit = { min: "2010-01-01",  max: moment(new Date()).format('YYYY-MM-DD') };
    const endDateLimit = { min: "2010-01-01", max: moment(new Date()).format('YYYY-MM-DD') };
    const [ activeStatus, setActiveStatus ] = useState(false);
    const [ inactiveStatus, setInactiveStatus ] = useState(false);
    const [ videoType, setVideoType ] = useState(false);
    const [ articleType, setArticleType ] = useState(false);
    const [ mediaTypes, setMediaTypes ] = useState<MediaType[]>([]);

    useEffect(() => {
        getMediaTypes().then((data: MediaType[]) => {
            setMediaTypes(data);
        });
    }, []);

    const handleClickEvent = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowFilter(true);
    }

    const getMediaTypeByName = (mediaTypeName: string) => {
        if (mediaTypeName === 'all') {
            const filterMediaTypes = mediaTypes.map(mediaType => mediaType.id);
            return filterMediaTypes;
        }
        const filterMediaType = mediaTypes.find(mediaType => mediaType.type === mediaTypeName);
        return filterMediaType.id;
    }

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const params = workoutFilterParams;
        if (name === 'bookmarked') {
            params.bookmarked = checked;
        } else if (name === 'active') {
            params.active = "true";
            setActiveStatus(checked);
        } else if (name === 'inActive') {
            params.active = "false";
            setInactiveStatus(checked);
        } else if (name === 'video') {
            setVideoType(checked);
        } else if (name === 'article') {
            setArticleType(checked);
        }
        setWorkoutFilterParams(params);
    }

    const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        const params = workoutFilterParams;
        if (name === 'startDate') {
            const date = moment(value).format('YYYY-MM-DD');
            params.startDate = date;
        } else if (name === 'endDate') {
            params.endDate = moment(value).format('YYYY-MM-DD');
        }
        setWorkoutFilterParams(params);
    }

    const cancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const params = filterParams;
        setWorkoutFilterParams(params);
        setShowFilter(false);
    }

    const apply = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const params = Object.assign({}, workoutFilterParams);
        if ((activeStatus && inactiveStatus) || (!activeStatus && !inactiveStatus)) {
            delete params.active;
        }
        if (videoType && articleType) {
            params.mediaTypeId = getMediaTypeByName('all');
        } else if (videoType && !articleType) {
            params.mediaTypeId = getMediaTypeByName('video');
        } else if (!videoType && articleType) {
            params.mediaTypeId = getMediaTypeByName('article')
        } else if (!videoType && !articleType) {
            delete params.mediaTypeId;
        }
        setFilterParams(params);
        setWorkoutFilterParams(params);
        setShowFilter(false);
    }

    const clearFilter = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const params = {
            pageSize: filterParams.pageSize,
            currentPage: filterParams.currentPage,
            searchText: filterParams.searchText
        };
        setFilterParams(params);
        setWorkoutFilterParams(params);
        setShowFilter(false);
    }

    return (
        <>
            <Button variant="primary" ref={filterElement} onClick={handleClickEvent}>
                Filter
            </Button>
            <Overlay
                show={showFilter}
                target={filterElement.current}
                placement="bottom"
                transition={false}
            >
                {({ arrowProps, show: _show, ...props }) => (
                    <div {...props} className="filter-container">
                        <div className="filter-title text-align-center">Workout Filter</div>
                        <div className="filter-elements">
                            <label className="checkbox-label">
                                <span className="checkbox-field-name">
                                    Video:
                                </span>
                                <span className="checkbox-field">
                                    <input type="checkbox" name="video" defaultChecked={videoType} onChange={handleCheckbox}/>
                                </span>
                            </label>
                            <label className="checkbox-label">
                                <span className="checkbox-field-name">
                                    Article:
                                </span>
                                <span className="checkbox-field">
                                    <input type="checkbox" name="article" defaultChecked={articleType} onChange={handleCheckbox}/>
                                </span>
                            </label>
                            <label className="date-label">
                                <span className="date-field-name">
                                    Start date:
                                </span>
                                <span className="date-field">
                                    <input type="date" name="startDate" min={startDateLimit.min} max={startDateLimit.max}
                                        placeholder="YYYY-MM-DD" value={workoutFilterParams.startDate} onChange={handleDate}/>
                                </span>
                            </label>
                            <label className="date-label">
                                <span className="date-field-name">
                                    End date:
                                </span>
                                <span className="date-field">
                                    <input type="date" name="endDate" min={endDateLimit.min} max={endDateLimit.max}
                                        placeholder="YYYY-MM-DD" value={workoutFilterParams.endDate} onChange={handleDate}/>
                                </span>
                            </label>
                            <label className="checkbox-label">
                                <span className="checkbox-field-name">
                                    Bookmarked:
                                </span>
                                <span className="checkbox-field">
                                    <input type="checkbox" name="bookmarked" defaultChecked={workoutFilterParams.bookmarked} onChange={handleCheckbox}/>
                                </span>
                            </label>
                            <label className="checkbox-label">
                                <span className="checkbox-field-name">
                                    Active:
                                </span>
                                <span className="checkbox-field">
                                    <input type="checkbox" name="active" defaultChecked={activeStatus} onChange={handleCheckbox}/>
                                </span>
                            </label>
                            <label className="checkbox-label">
                                <span className="checkbox-field-name">
                                    InActive:
                                </span>
                                <span className="checkbox-field">
                                    <input type="checkbox" name="inActive" defaultChecked={inactiveStatus} onChange={handleCheckbox}/>
                                </span>
                            </label>
                        </div>
                        <div className="filter-footer float-right">
                            <Button className="action-button" variant="secondary" size="sm" onClick={cancel}>Cancel</Button>
                            <Button className="action-button" variant="success" size="sm" onClick={clearFilter}>Clear Filter</Button>
                            <Button className="action-button" variant="primary" size="sm" onClick={apply}>Apply</Button>
                        </div>
                    </div>
                )}
            </Overlay>
        </>
    )
}

export default WorkoutFilters;