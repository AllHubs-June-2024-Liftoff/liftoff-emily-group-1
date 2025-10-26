import React, { useEffect, useState } from "react";
import NewDiscussionForm from "./NewDiscussionForm";
import { useAuth } from "../../Services/AuthContext";
import Discussions from "./Discussions";

export default function DiscussionsPage() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => setRefreshKey(k => k + 1);

  return (
    <>
      <NewDiscussionForm user={user} onCreated={handleCreated} />
      <div style={{ marginTop: 24 }}>
        <Discussions key={refreshKey} />
      </div>
    </>
  );
}
