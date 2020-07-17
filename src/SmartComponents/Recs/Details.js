import './_Details.scss';

import {
    Breadcrumb,
    BreadcrumbHeading,
    BreadcrumbItem,
    Card,
    CardBody,
    DataList,
    DataListCell,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    ExpandableSection,
    Form,
    FormGroup,
    Label,
    Split,
    SplitItem,
    TextArea
} from '@patternfly/react-core';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import React, { useEffect, useState } from 'react';
import { fetchContentDetails, fetchContentDetailsHits } from '../../store/Actions';

import HostSelector from '../../PresentationalComponents/HostSelector/HostSelector';
import { InsightsReportCard } from '@redhat-cloud-services/frontend-components-inventory-insights';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Details = ({ match, fetchContentDetails, details, fetchContentDetailsHits, contentDetailsHits }) => {
    const [selectedListItem, setSelectedListItem] = useState(0);
    const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
    const [expanded, setExpanded] = useState(true);
    const pyFilter = data => {
        const keysToInclude = Object.keys(data).filter(key => !key.includes('__'));
        const arrayObj = keysToInclude.map(key => ({ [key]: data[key] }));

        return Object.assign({}, ...arrayObj);
    };

    const selectedPyData = selectedListItem >= 1 && pyFilter(contentDetailsHits[selectedListItem - 1]);
    const detailHref = `https://access.redhat.com/node/${details.node_id}`;
    const [freeStyle, setFreeStyle] = useState('');
    const [freeStyleValidated, setFreeStyleValidated] = useState('default');
    const [validFreeStyle, setValidFreeStyle] = useState('');
    const [helperText, setHelperText] = useState('Please enter valid JSON');

    const freeStyleChange = input => {
        let isValid;
        const parser = input => {
            try {
                return JSON.parse(input);
            }
            catch (error) {
                return false;
            }
        };

        if (input.length > 0) {
            const validInput = parser(input);
            if (validInput) {
                isValid = 'success';
                setValidFreeStyle(validInput);
                setHelperText('Valid JSON! 🥰');
            } else {
                isValid = 'error';
                setValidFreeStyle('');
            }
        } else {
            isValid = 'default';
            setValidFreeStyle('');
            setHelperText('Please enter valid JSON');
        }

        setFreeStyleValidated(isValid);
        setFreeStyle(input);
    };

    const severityLabelColor = severity => severity === 'ERROR' ? 'red' : severity === 'WARN' ? 'orange' : severity === 'INFO' ? 'purple' : 'blue';

    useEffect(() => {
        const detailName = { name: match.params.recDetail };
        fetchContentDetails(detailName);
        fetchContentDetailsHits(detailName);
    }, [fetchContentDetails, match.params.recDetail, fetchContentDetailsHits]);

    return <React.Fragment>
        <PageHeader>
            <Breadcrumb>
                <BreadcrumbItem><Link to='./'>Content Preview</Link></BreadcrumbItem>
                <BreadcrumbHeading to='#'>{`${match.params.recDetail}`}</BreadcrumbHeading>
            </Breadcrumb>
            <PageHeaderTitle title={`${details.rule_id || 'loading...'}`} />
            {details.status !== undefined && <Label color={details.status === 'active' ? 'green' : 'red'}>{capitalize(details.status)}</Label>}
            <HostSelector />
        </PageHeader>
        <Main>
            <Split hasGutter>
                <SplitItem className='halfSplit'>
                    <Card>
                        <CardBody>
                            <ExpandableSection toggleText={details.name} onToggle={() => setExpanded(!expanded)} isExpanded={expanded}>
                                <p>{`Publish Date: ${details.publish_date} | `}{details.node_id ? <a href={detailHref}>{detailHref}</a> : <Label variant='outline' color='gray'>No node_id present</Label>}</p>
                                {details.reboot_required && <Label variant='outline' color='gray'>Reboot required</Label>}
                                <Label variant='outline' color='gray'>{details.category}</Label>
                                {details.severity && <Label variant='outline' color={severityLabelColor(details.severity)}>{details.severity}</Label>}
                                <Form>
                                    <FormGroup
                                        label='Free Style JSON input:'
                                        type='string'
                                        helperText={helperText}
                                        helperTextInvalid='Not valid JSON'
                                        fieldId='selection'
                                        validated={freeStyleValidated}
                                    >
                                        <TextArea
                                            value={freeStyle}
                                            onChange={freeStyleChange}
                                            isRequired
                                            validated={freeStyleValidated}
                                            aria-label='free style JSON input'
                                        />
                                    </FormGroup>
                                </Form>
                            </ExpandableSection>
                        </CardBody>
                    </Card>
                    <DataList
                        className='pyDataList'
                        aria-label='selectable data list example'
                        selectedDataListItemId={selectedListItem}
                        onSelectDataListItem={(id) => id !== selectedListItem ? setSelectedListItem(id) : setSelectedListItem(0)}>
                        {contentDetailsHits.map((item, key) =>
                            <DataListItem aria-labelledby='selectable-action-item1' key={key + 1} id={key + 1}>
                                <DataListItemRow className='overFlow'>
                                    <DataListItemCells
                                        dataListCells={[
                                            <DataListCell key='primary content'>
                                                <Split hasGutter>
                                                    <SplitItem><b>{item.__name}</b></SplitItem>
                                                    <SplitItem><Label color='blue'>{item.__source}</Label></SplitItem>
                                                </Split>
                                                <h5>{item.__date}</h5>
                                                <pre>{JSON.stringify(pyFilter(item), null, 2)}</pre>
                                            </DataListCell>
                                        ]}
                                    /></DataListItemRow>
                            </DataListItem>
                        )}
                    </DataList>
                </SplitItem>
                <SplitItem className='halfSplit overFlow'>
                    <InsightsReportCard report={{
                        ...details,
                        ...(selectedPyData && { details: selectedPyData }),
                        ...(validFreeStyle && { details: validFreeStyle }),
                        resolution: { resolution: details.resolution }
                    }} />
                </SplitItem>
            </Split>
        </Main>
    </React.Fragment >;
};

Details.displayName = 'view-rec-details';

Details.propTypes = {
    match: PropTypes.object,
    fetchContentDetails: PropTypes.func,
    details: PropTypes.object,
    contentDetailsFetchStatus: PropTypes.string,
    contentDetailsHits: PropTypes.array,
    fetchContentDetailsHits: PropTypes.func,
    contentDetailsHitsFetchStatus: PropTypes.string
};

const mapStateToProps = ({ CPStore }) => ({
    details: CPStore.contentDetails,
    detailsFetchStatus: CPStore.fetchContentStatus,
    contentDetailsHits: CPStore.contentDetailsHits,
    contentDetailsHitsFetchStatus: CPStore.contentDetailsHitsFetchStatus
});

const mapDispatchToProps = dispatch => ({
    fetchContentDetails: options => dispatch(fetchContentDetails(options)),
    fetchContentDetailsHits: options => dispatch(fetchContentDetailsHits(options))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Details));
