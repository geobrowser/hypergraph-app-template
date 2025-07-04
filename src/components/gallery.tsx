import { Card } from './card';
import { Project } from '@/schema';
import {
  useQuery,
} from '@graphprotocol/hypergraph-react';

export function Gallery() {

  const { data: projects } = useQuery(Project, {
    mode: 'public',
    include: { avatar: {}}})

    
    console.log(projects)

  const items = [
    {
      name: 'Project Alpha',
      coverImage: 'https://picsum.photos/400/300?random=1'
    },
    {
      name: 'Project Beta',
      coverImage: 'https://picsum.photos/400/300?random=2'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {projects.slice(0,12).map((project, index) => (
        <Card 
          key={index}
          name={project.name}
          image={project.cover.url}
        />
      ))}
    </div>
  );
}