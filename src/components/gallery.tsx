import { Project } from '@/schema';
import { useQuery } from '@graphprotocol/hypergraph-react';
import { Card } from './card';

export function Gallery() {
  const { data: projects } = useQuery(Project, {
    mode: 'public',
    include: { avatar: {} },
  });

  const projectsWithAvatar = projects?.filter((project) => project.avatar.length > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {projectsWithAvatar.slice(0, 12).map((project, index) => (
        <Card key={index} name={project.name} image={project.avatar[0].url} />
      ))}
    </div>
  );
}
