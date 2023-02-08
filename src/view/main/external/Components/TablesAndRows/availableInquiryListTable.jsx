import AvailableInquiryListRow from "./availableInquiryListRow";

export default function AvailableInquiryListTable({
  userSession,
  inquiryHistoryList,
  reloadInquiryHistory,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          {userSession.isAdmin && (
            <>
              <th>Status</th>
              <th>Delete</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {inquiryHistoryList.map((inquiryHistory, index) => (
          <AvailableInquiryListRow
            key={index}
            inquiryHistory={inquiryHistory}
            reloadInquiryHistory={reloadInquiryHistory}
            userSession={userSession}
          />
        ))}
      </tbody>
    </table>
  );
}
