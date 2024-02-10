import { MainLayout } from "@/components/templates/main-layout";
import { DetailCard } from "@/components/molecules"
import { BackButton } from '@/components/molecules'
import { IonSpinner } from "@ionic/react";
import { useParams } from "react-router-dom";
import { useGetUserDetailQuery } from "@/services/usersService";

/**
 * Represents a detail page component.
 */
export default function Detail(){
  const params = useParams<{id: string}>()
  const { id } = params

  // Fetches user detail data based on the provided ID
  const { isLoading, data: user } = useGetUserDetailQuery(id)
  
  return (
    <MainLayout 
      title="NVP Interview Test | Detail" 
      slotStart={<BackButton href="/tabs/home" />} 
    >
      <div className="flex flex-row justify-center">
        {isLoading 
          ? <IonSpinner />
          : user && <DetailCard user={user} />
        }
      </div>
    </MainLayout>
  )
}