import { Category, Maybe, Media } from "../../__generated/graphql";

// proxy type to work with changes that are currently not in the api yet.

export interface CategoryUiBase extends Category {
    icon?: Maybe<Media>;
}
