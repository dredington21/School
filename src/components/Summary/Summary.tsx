import { Accordion } from "react-bootstrap";
import GpaBreakdown from "./GpaBreakdown";
import DepartmentRanking from "./DepartmentRanking";
import OfferingHistory from "./OfferingHistory";

const Summary = () => {
  return (
    <>
      <div className="display-6">College Summary</div>
      <hr />

      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>GPA Breakdown By Major</Accordion.Header>
          <Accordion.Body>
            <GpaBreakdown />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>GPA Ranking by Department</Accordion.Header>
          <Accordion.Body>
            <DepartmentRanking />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Course Offering History</Accordion.Header>
          <Accordion.Body>
            <OfferingHistory />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Summary;
