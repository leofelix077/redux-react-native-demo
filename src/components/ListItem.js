import React, { Component } from "react";
import {
    Text,
    TouchableWithoutFeedback,
    View,
    NativeModules,
    LayoutAnimation
} from "react-native"
import { CardItem } from "./common";
import { Card } from "./common";
import { connect } from "react-redux"
import * as actions from "../actions"

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)


class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderDescription() {
        const { library, expanded } = this.props
        if (expanded)
            return (
                <Card>
                    <CardItem>
                        <Text style={styles.contentDescriptionStyle}>
                            {library.description}
                        </Text>
                    </CardItem>
                </Card>
            )
    }

    shouldDisplayLibrary(id) {
        const { expanded, selectedLibraryId } = this.props;
        if (expanded && id === selectedLibraryId)
            return null;
        return id;
    }

    toggleLibrary(id) {
        this.props.selectLibrary(this.shouldDisplayLibrary(id))
    }


    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;

        return (
            <Card>
                <TouchableWithoutFeedback onPress={() => this.toggleLibrary(id)}>
                    <View>
                        <CardItem>
                            <Text style={titleStyle}>
                                {title}
                            </Text>
                        </CardItem>
                        {this.renderDescription()}
                    </View>
                </TouchableWithoutFeedback>
            </Card>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingTop: 5,
        fontWeight: "bold"
    },
    contentDescriptionStyle: {
        fontSize: 16,
        paddingLeft: 25,
        paddingBottom: 5,
        paddingTop: 5,
        textAlign: "left",
        flex: 1
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;
    return {
        expanded,
        selectedLibraryId: state.selectedLibraryId
    };
}


export default connect(mapStateToProps, actions)(ListItem);