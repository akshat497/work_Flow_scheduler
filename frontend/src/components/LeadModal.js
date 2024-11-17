// LeadModal.js
import React from 'react';

function LeadModal() {
  return (
    <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myModalLabel">Add a Source Block</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Pick a block & configure, any new leads that match rules will be added to sequence automatically.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
              <div className="source-block">Leads from List(s)<br /><small>Connect multiple lists as sources for this sequence.</small></div>
              <div className="source-block">Segment by Events<br /><small>Create a segment of leads who have engaged with emails previously.</small></div>
              <div className="source-block">Segment of List<br /><small>Create a segment of leads which match SalesBlink Variables.</small></div>
              <div className="source-block">Lead from CRM Integration<br /><small>Pulls leads from your CRM integrations.</small></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadModal;
