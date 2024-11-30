import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [currentGroup, setCurrentGroup] = useState<string | null>(null);
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    loadGroups();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  function loadGroups() {
    // Load groups from Amplify DataStore or API
    // Example: setGroups([...fetchedGroups]);
    setGroups(["Group 1", "Group 2", "Group 3"]); // Example groups
  }

  function createGroup() {
    const groupName = window.prompt("Enter Group Name");
    if (groupName) {
      // Create group using Amplify DataStore or API
      setGroups([...groups, groupName]);
    }
  }

  function openGroup(groupName: string) {
    setCurrentGroup(groupName);
  }

  function leaveGroup() {
    setCurrentGroup(null);
  }

  return (
    <main>
      {currentGroup ? (
        <div id="workspaceSection">
          <div id="workspaceHeader">
            <h2 id="workspaceTitle">Workspace: {currentGroup}</h2>
            <div id="workspaceButtons">
              <button id="documentsBtn" onClick={() => { /* Show documents */ }}>
                <i className="fas fa-file-alt"></i> Documents
              </button>
              <button id="notesBtn" onClick={() => { /* Show notes */ }}>
                <i className="fas fa-pencil-alt"></i> Notes
              </button>
              <button id="calendarBtn" onClick={() => { /* Show calendar */ }}>
                <i className="fas fa-calendar-alt"></i> Calendar
              </button>
              <button id="leaveGroupBtn" onClick={leaveGroup}>
                <i className="fas fa-sign-out-alt"></i> Leave
              </button>
            </div>
          </div>
          <div id="workspaceContent" className="workspace-layout">
            <div className="main-area">
              {/* Add content sections here */}
              <h4>Todos</h4>
              <ul>
                {todos.map(todo => (
                  <li key={todo.id}>
                    {todo.content}
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </li>
                ))}
              </ul>
              <button onClick={createTodo}>Add Todo</button>
            </div>
            <div className="side-panel">
              {/* Add side panel tools here */}
            </div>
          </div>
        </div>
      ) : (
        <div id="homepage">
          <h1 id="welcomeText">Welcome to SyncSpace</h1>
          <div id="create-group-section">
            <input type="text" id="groupName" placeholder="Enter Group Name" />
            <button id="createGroupBtn" onClick={createGroup}>Create Group</button>
          </div>
          <h2 id="yourGroupsHeader">Your Groups</h2>
          <div id="savedGroups">
            {groups.map(group => (
              <div key={group} className="saved-group" onClick={() => openGroup(group)}>
                <span>{group}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
}

export default App;
