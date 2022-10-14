import { Badge, IconButton } from "@mui/material";
import useAuth from "../../app/data/hook/useAuth";
import Link from "../../Link";
import NotificationsIcon from '@mui/icons-material/Notifications';

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { user } = useAuth();
  return (
    <IconButton component={Link} noLinkStyle href="/perfil">
      <Badge badgeContent={4} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
