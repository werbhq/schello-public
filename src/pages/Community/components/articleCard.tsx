import { Card, CardContent, Collapse, Stack, Typography } from "@mui/material";
import stringToHtml from "html-react-parser";
import Expand from "components/ui/Expand";
import { useState } from "react";
import { Schedule } from "@mui/icons-material";
import { CommunityArticle } from "types/Community";

export default function ArticleCard(props: CommunityArticle) {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);

  return (
    <Card
      sx={{
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "245px",
        margin: "5px",
        whiteSpaceP: "nowrap",
      }}
    >
      <CardContent>
        <Stack>
          <Typography variant="h6" padding="5px 0px">
            {props.title}
          </Typography>

          <Stack direction="row" alignItems="center">
            <Schedule />
            <p style={{ fontSize: "0.8em", margin: "0", padding: "0px 5px" }}>
              {new Date(props.timestamp).toDateString()}
            </p>
            {props.description !== "" && (
              <Expand expanded={expanded} handleExpand={handleExpand} />
            )}
          </Stack>

          {props.description !== "" && (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Stack marginBottom="10px">
                {stringToHtml(props.description ?? "")}
              </Stack>
            </Collapse>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
