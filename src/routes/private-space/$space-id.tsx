import { Project } from '@/schema';
import {
  HypergraphSpaceProvider,
  preparePublish,
  publishOps,
  useCreateEntity,
  useHypergraphApp,
  useQuery,
  useSpace,
  useSpaces,
} from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/private-space/$space-id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { 'space-id': spaceId } = Route.useParams();

  return (
    <HypergraphSpaceProvider space={spaceId}>
      <PrivateSpace />
    </HypergraphSpaceProvider>
  );
}

function PrivateSpace() {
  const { name, ready } = useSpace({ mode: 'private' });
  const { data: projects } = useQuery(Project, { mode: 'private' });
  const { data: publicSpaces } = useSpaces({ mode: 'public' });
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const createProject = useCreateEntity(Project);
  const [projectName, setProjectName] = useState('');
  const { getSmartSessionClient } = useHypergraphApp();

  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject({ name: projectName, description: 'Beautiful project' });
    setProjectName('');
  };

  const publishToPublicSpace = async (project: Project) => {
    if (!selectedSpace) {
      alert('No space selected');
      return;
    }
    try {
      const { ops } = await preparePublish({ entity: project, publicSpace: selectedSpace });
      const smartSessionClient = await getSmartSessionClient();
      if (!smartSessionClient) {
        throw new Error('Missing smartSessionClient');
      }
      const publishResult = await publishOps({
        ops,
        space: selectedSpace,
        name: 'Publish Project',
        walletClient: smartSessionClient,
      });
      console.log(publishResult, ops);
      alert('Project published to public space');
    } catch (error) {
      console.error(error);
      alert('Error publishing project to public space');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold">{name}</h1>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="text-sm font-bold">Project</span>
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </label>
        <button type="submit">Create Project</button>
      </form>

      <ul>
        {projects?.map((project) => (
          <li key={project.id}>
            {project.name}
            <select value={selectedSpace} onChange={(e) => setSelectedSpace(e.target.value)}>
              <option value="">Select a space</option>
              {publicSpaces?.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name}
                </option>
              ))}
            </select>
            <button onClick={() => publishToPublicSpace(project)}>Publish</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
