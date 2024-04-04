export const revalidate = 0;


// https://tailwindcomponents.com/component/hoverable-table
import { getPaginationUsers } from '@/actions';
import { Pagination, Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {


  const { ok, users = [] } = await getPaginationUsers();

  if (!ok) {
    redirect('/auth/login');
  }


  return (


    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>

      <Pagination totalPages={1} />
    </>
  );
}